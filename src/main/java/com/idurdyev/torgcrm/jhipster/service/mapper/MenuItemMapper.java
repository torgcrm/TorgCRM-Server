package com.idurdyev.torgcrm.jhipster.service.mapper;

import com.idurdyev.torgcrm.jhipster.domain.*;
import com.idurdyev.torgcrm.jhipster.service.dto.MenuItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MenuItem and its DTO MenuItemDTO.
 */
@Mapper(componentModel = "spring", uses = {MenuMapper.class})
public interface MenuItemMapper extends EntityMapper<MenuItemDTO, MenuItem> {

    @Mapping(source = "menu.id", target = "menuId")
    MenuItemDTO toDto(MenuItem menuItem);

    @Mapping(source = "menuId", target = "menu")
    MenuItem toEntity(MenuItemDTO menuItemDTO);

    default MenuItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuItem menuItem = new MenuItem();
        menuItem.setId(id);
        return menuItem;
    }
}
