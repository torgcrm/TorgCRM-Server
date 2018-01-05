package com.idurdyev.torgcrm.jhipster.repository;

import com.idurdyev.torgcrm.jhipster.domain.Department;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Department entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
