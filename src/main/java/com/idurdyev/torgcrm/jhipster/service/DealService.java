package com.idurdyev.torgcrm.jhipster.service;

import com.idurdyev.torgcrm.jhipster.service.dto.DealDTO;
import java.util.List;

/**
 * Service Interface for managing Deal.
 */
public interface DealService {

    /**
     * Save a deal.
     *
     * @param dealDTO the entity to save
     * @return the persisted entity
     */
    DealDTO save(DealDTO dealDTO);

    /**
     * Get all the deals.
     *
     * @return the list of entities
     */
    List<DealDTO> findAll();

    /**
     * Get the "id" deal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DealDTO findOne(Long id);

    /**
     * Delete the "id" deal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
