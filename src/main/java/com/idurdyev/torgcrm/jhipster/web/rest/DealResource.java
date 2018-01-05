package com.idurdyev.torgcrm.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idurdyev.torgcrm.jhipster.domain.Deal;

import com.idurdyev.torgcrm.jhipster.repository.DealRepository;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.BadRequestAlertException;
import com.idurdyev.torgcrm.jhipster.web.rest.util.HeaderUtil;
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
 * REST controller for managing Deal.
 */
@RestController
@RequestMapping("/api")
public class DealResource {

    private final Logger log = LoggerFactory.getLogger(DealResource.class);

    private static final String ENTITY_NAME = "deal";

    private final DealRepository dealRepository;

    public DealResource(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    /**
     * POST  /deals : Create a new deal.
     *
     * @param deal the deal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deal, or with status 400 (Bad Request) if the deal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deals")
    @Timed
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) throws URISyntaxException {
        log.debug("REST request to save Deal : {}", deal);
        if (deal.getId() != null) {
            throw new BadRequestAlertException("A new deal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Deal result = dealRepository.save(deal);
        return ResponseEntity.created(new URI("/api/deals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deals : Updates an existing deal.
     *
     * @param deal the deal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deal,
     * or with status 400 (Bad Request) if the deal is not valid,
     * or with status 500 (Internal Server Error) if the deal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deals")
    @Timed
    public ResponseEntity<Deal> updateDeal(@RequestBody Deal deal) throws URISyntaxException {
        log.debug("REST request to update Deal : {}", deal);
        if (deal.getId() == null) {
            return createDeal(deal);
        }
        Deal result = dealRepository.save(deal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deals : get all the deals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deals in body
     */
    @GetMapping("/deals")
    @Timed
    public List<Deal> getAllDeals() {
        log.debug("REST request to get all Deals");
        return dealRepository.findAll();
        }

    /**
     * GET  /deals/:id : get the "id" deal.
     *
     * @param id the id of the deal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deal, or with status 404 (Not Found)
     */
    @GetMapping("/deals/{id}")
    @Timed
    public ResponseEntity<Deal> getDeal(@PathVariable Long id) {
        log.debug("REST request to get Deal : {}", id);
        Deal deal = dealRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deal));
    }

    /**
     * DELETE  /deals/:id : delete the "id" deal.
     *
     * @param id the id of the deal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deals/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        log.debug("REST request to delete Deal : {}", id);
        dealRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
