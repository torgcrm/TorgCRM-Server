package com.idurdyev.torgcrm.jhipster.service.mapper;

import com.idurdyev.torgcrm.jhipster.domain.*;
import com.idurdyev.torgcrm.jhipster.service.dto.DealDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Deal and its DTO DealDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface DealMapper extends EntityMapper<DealDTO, Deal> {

    @Mapping(source = "customer.id", target = "customerId")
    DealDTO toDto(Deal deal);

    @Mapping(source = "customerId", target = "customer")
    Deal toEntity(DealDTO dealDTO);

    default Deal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Deal deal = new Deal();
        deal.setId(id);
        return deal;
    }
}
