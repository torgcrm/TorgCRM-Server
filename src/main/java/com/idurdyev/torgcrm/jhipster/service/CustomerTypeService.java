package com.idurdyev.torgcrm.jhipster.service;

import com.idurdyev.torgcrm.jhipster.service.dto.CustomerTypeDTO;
import java.util.List;

/**
 * Service Interface for managing CustomerType.
 */
public interface CustomerTypeService {

    /**
     * Save a customerType.
     *
     * @param customerTypeDTO the entity to save
     * @return the persisted entity
     */
    CustomerTypeDTO save(CustomerTypeDTO customerTypeDTO);

    /**
     * Get all the customerTypes.
     *
     * @return the list of entities
     */
    List<CustomerTypeDTO> findAll();

    /**
     * Get the "id" customerType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CustomerTypeDTO findOne(Long id);

    /**
     * Delete the "id" customerType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
