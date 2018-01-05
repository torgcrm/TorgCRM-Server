package com.idurdyev.torgcrm.jhipster.repository;

import com.idurdyev.torgcrm.jhipster.domain.Deal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Deal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

}
