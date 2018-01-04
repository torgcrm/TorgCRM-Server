package com.idurdyev.torgcrm.jhipster.repository;

import com.idurdyev.torgcrm.jhipster.domain.CustomerType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerTypeRepository extends JpaRepository<CustomerType, Long> {

}
