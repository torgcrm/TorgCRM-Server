package com.idurdyev.torgcrm.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idurdyev.torgcrm.jhipster.service.DepartmentService;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.BadRequestAlertException;
import com.idurdyev.torgcrm.jhipster.web.rest.util.HeaderUtil;
import com.idurdyev.torgcrm.jhipster.service.dto.DepartmentDTO;
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
 * REST controller for managing Department.
 */
@RestController
@RequestMapping("/api")
public class DepartmentResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentResource.class);

    private static final String ENTITY_NAME = "department";

    private final DepartmentService departmentService;

    public DepartmentResource(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    /**
     * POST  /departments : Create a new department.
     *
     * @param departmentDTO the departmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new departmentDTO, or with status 400 (Bad Request) if the department has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/departments")
    @Timed
    public ResponseEntity<DepartmentDTO> createDepartment(@RequestBody DepartmentDTO departmentDTO) throws URISyntaxException {
        log.debug("REST request to save Department : {}", departmentDTO);
        if (departmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new department cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepartmentDTO result = departmentService.save(departmentDTO);
        return ResponseEntity.created(new URI("/api/departments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /departments : Updates an existing department.
     *
     * @param departmentDTO the departmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated departmentDTO,
     * or with status 400 (Bad Request) if the departmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the departmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/departments")
    @Timed
    public ResponseEntity<DepartmentDTO> updateDepartment(@RequestBody DepartmentDTO departmentDTO) throws URISyntaxException {
        log.debug("REST request to update Department : {}", departmentDTO);
        if (departmentDTO.getId() == null) {
            return createDepartment(departmentDTO);
        }
        DepartmentDTO result = departmentService.save(departmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, departmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /departments : get all the departments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of departments in body
     */
    @GetMapping("/departments")
    @Timed
    public List<DepartmentDTO> getAllDepartments() {
        log.debug("REST request to get all Departments");
        return departmentService.findAll();
        }

    /**
     * GET  /departments/:id : get the "id" department.
     *
     * @param id the id of the departmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the departmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/departments/{id}")
    @Timed
    public ResponseEntity<DepartmentDTO> getDepartment(@PathVariable Long id) {
        log.debug("REST request to get Department : {}", id);
        DepartmentDTO departmentDTO = departmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(departmentDTO));
    }

    /**
     * DELETE  /departments/:id : delete the "id" department.
     *
     * @param id the id of the departmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/departments/{id}")
    @Timed
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        log.debug("REST request to delete Department : {}", id);
        departmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
