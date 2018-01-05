package com.idurdyev.torgcrm.jhipster.repository;

import com.idurdyev.torgcrm.jhipster.domain.Menu;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Menu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

}
