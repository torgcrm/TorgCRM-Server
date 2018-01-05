package com.idurdyev.torgcrm.jhipster.service;

import com.idurdyev.torgcrm.jhipster.service.dto.MenuItemDTO;
import java.util.List;

/**
 * Service Interface for managing MenuItem.
 */
public interface MenuItemService {

    /**
     * Save a menuItem.
     *
     * @param menuItemDTO the entity to save
     * @return the persisted entity
     */
    MenuItemDTO save(MenuItemDTO menuItemDTO);

    /**
     * Get all the menuItems.
     *
     * @return the list of entities
     */
    List<MenuItemDTO> findAll();

    /**
     * Get the "id" menuItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MenuItemDTO findOne(Long id);

    /**
     * Delete the "id" menuItem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
