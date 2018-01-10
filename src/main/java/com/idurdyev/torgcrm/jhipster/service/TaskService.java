package com.idurdyev.torgcrm.jhipster.service;

import com.idurdyev.torgcrm.jhipster.service.dto.TaskDTO;
import java.util.List;

/**
 * Service Interface for managing Task.
 */
public interface TaskService {

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save
     * @return the persisted entity
     */
    TaskDTO save(TaskDTO taskDTO);

    /**
     * Get all the tasks.
     *
     * @return the list of entities
     */
    List<TaskDTO> findAll();

    /**
     * Get the "id" task.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TaskDTO findOne(Long id);

    /**
     * Delete the "id" task.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
