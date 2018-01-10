package com.idurdyev.torgcrm.jhipster.repository;

import com.idurdyev.torgcrm.jhipster.domain.Manager;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Manager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

}
