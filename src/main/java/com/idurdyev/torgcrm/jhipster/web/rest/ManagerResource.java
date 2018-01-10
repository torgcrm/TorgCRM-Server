package com.idurdyev.torgcrm.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idurdyev.torgcrm.jhipster.service.ManagerService;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.BadRequestAlertException;
import com.idurdyev.torgcrm.jhipster.web.rest.util.HeaderUtil;
import com.idurdyev.torgcrm.jhipster.service.dto.ManagerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Manager.
 */
@RestController
@RequestMapping("/api")
public class ManagerResource {

    private final Logger log = LoggerFactory.getLogger(ManagerResource.class);

    private static final String ENTITY_NAME = "manager";

    private final ManagerService managerService;

    public ManagerResource(ManagerService managerService) {
        this.managerService = managerService;
    }

    /**
     * POST  /managers : Create a new manager.
     *
     * @param managerDTO the managerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new managerDTO, or with status 400 (Bad Request) if the manager has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/managers")
    @Timed
    public ResponseEntity<ManagerDTO> createManager(@RequestBody ManagerDTO managerDTO) throws URISyntaxException {
        log.debug("REST request to save Manager : {}", managerDTO);
        if (managerDTO.getId() != null) {
            throw new BadRequestAlertException("A new manager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ManagerDTO result = managerService.save(managerDTO);
        return ResponseEntity.created(new URI("/api/managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /managers : Updates an existing manager.
     *
     * @param managerDTO the managerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated managerDTO,
     * or with status 400 (Bad Request) if the managerDTO is not valid,
     * or with status 500 (Internal Server Error) if the managerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/managers")
    @Timed
    public ResponseEntity<ManagerDTO> updateManager(@RequestBody ManagerDTO managerDTO) throws URISyntaxException {
        log.debug("REST request to update Manager : {}", managerDTO);
        if (managerDTO.getId() == null) {
            return createManager(managerDTO);
        }
        ManagerDTO result = managerService.save(managerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, managerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /managers : get all the managers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of managers in body
     */
    @GetMapping("/managers")
    @Timed
    public List<ManagerDTO> getAllManagers() {
        log.debug("REST request to get all Managers");
        return managerService.findAll();
        }

    /**
     * GET  /managers/:id : get the "id" manager.
     *
     * @param id the id of the managerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the managerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/managers/{id}")
    @Timed
    public ResponseEntity<ManagerDTO> getManager(@PathVariable Long id) {
        log.debug("REST request to get Manager : {}", id);
        ManagerDTO managerDTO = managerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(managerDTO));
    }

    /**
     * DELETE  /managers/:id : delete the "id" manager.
     *
     * @param id the id of the managerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/managers/{id}")
    @Timed
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {
        log.debug("REST request to delete Manager : {}", id);
        managerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
