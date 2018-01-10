package com.idurdyev.torgcrm.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idurdyev.torgcrm.jhipster.service.TaskService;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.BadRequestAlertException;
import com.idurdyev.torgcrm.jhipster.web.rest.util.HeaderUtil;
import com.idurdyev.torgcrm.jhipster.service.dto.TaskDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Task.
 */
@RestController
@RequestMapping("/api")
public class TaskResource {

    private final Logger log = LoggerFactory.getLogger(TaskResource.class);

    private static final String ENTITY_NAME = "task";

    private final TaskService taskService;

    public TaskResource(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * POST  /tasks : Create a new task.
     *
     * @param taskDTO the taskDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taskDTO, or with status 400 (Bad Request) if the task has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tasks")
    @Timed
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to save Task : {}", taskDTO);
        if (taskDTO.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskDTO result = taskService.save(taskDTO);
        return ResponseEntity.created(new URI("/api/tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tasks : Updates an existing task.
     *
     * @param taskDTO the taskDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taskDTO,
     * or with status 400 (Bad Request) if the taskDTO is not valid,
     * or with status 500 (Internal Server Error) if the taskDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tasks")
    @Timed
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to update Task : {}", taskDTO);
        if (taskDTO.getId() == null) {
            return createTask(taskDTO);
        }
        TaskDTO result = taskService.save(taskDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taskDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tasks : get all the tasks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tasks in body
     */
    @GetMapping("/tasks")
    @Timed
    public List<TaskDTO> getAllTasks() {
        log.debug("REST request to get all Tasks");
        return taskService.findAll();
        }

    /**
     * GET  /tasks/:id : get the "id" task.
     *
     * @param id the id of the taskDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taskDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tasks/{id}")
    @Timed
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        log.debug("REST request to get Task : {}", id);
        TaskDTO taskDTO = taskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(taskDTO));
    }

    /**
     * DELETE  /tasks/:id : delete the "id" task.
     *
     * @param id the id of the taskDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tasks/{id}")
    @Timed
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.debug("REST request to delete Task : {}", id);
        taskService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
