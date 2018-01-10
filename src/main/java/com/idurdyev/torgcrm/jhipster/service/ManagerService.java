package com.idurdyev.torgcrm.jhipster.service;

import com.idurdyev.torgcrm.jhipster.service.dto.ManagerDTO;
import java.util.List;

/**
 * Service Interface for managing Manager.
 */
public interface ManagerService {

    /**
     * Save a manager.
     *
     * @param managerDTO the entity to save
     * @return the persisted entity
     */
    ManagerDTO save(ManagerDTO managerDTO);

    /**
     * Get all the managers.
     *
     * @return the list of entities
     */
    List<ManagerDTO> findAll();

    /**
     * Get the "id" manager.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ManagerDTO findOne(Long id);

    /**
     * Delete the "id" manager.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
