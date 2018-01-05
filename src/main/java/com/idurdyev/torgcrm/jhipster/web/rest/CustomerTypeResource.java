package com.idurdyev.torgcrm.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.idurdyev.torgcrm.jhipster.service.CustomerTypeService;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.BadRequestAlertException;
import com.idurdyev.torgcrm.jhipster.web.rest.util.HeaderUtil;
import com.idurdyev.torgcrm.jhipster.service.dto.CustomerTypeDTO;
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
 * REST controller for managing CustomerType.
 */
@RestController
@RequestMapping("/api")
public class CustomerTypeResource {

    private final Logger log = LoggerFactory.getLogger(CustomerTypeResource.class);

    private static final String ENTITY_NAME = "customerType";

    private final CustomerTypeService customerTypeService;

    public CustomerTypeResource(CustomerTypeService customerTypeService) {
        this.customerTypeService = customerTypeService;
    }

    /**
     * POST  /customer-types : Create a new customerType.
     *
     * @param customerTypeDTO the customerTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerTypeDTO, or with status 400 (Bad Request) if the customerType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-types")
    @Timed
    public ResponseEntity<CustomerTypeDTO> createCustomerType(@RequestBody CustomerTypeDTO customerTypeDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerType : {}", customerTypeDTO);
        if (customerTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerTypeDTO result = customerTypeService.save(customerTypeDTO);
        return ResponseEntity.created(new URI("/api/customer-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-types : Updates an existing customerType.
     *
     * @param customerTypeDTO the customerTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerTypeDTO,
     * or with status 400 (Bad Request) if the customerTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-types")
    @Timed
    public ResponseEntity<CustomerTypeDTO> updateCustomerType(@RequestBody CustomerTypeDTO customerTypeDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerType : {}", customerTypeDTO);
        if (customerTypeDTO.getId() == null) {
            return createCustomerType(customerTypeDTO);
        }
        CustomerTypeDTO result = customerTypeService.save(customerTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-types : get all the customerTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerTypes in body
     */
    @GetMapping("/customer-types")
    @Timed
    public List<CustomerTypeDTO> getAllCustomerTypes() {
        log.debug("REST request to get all CustomerTypes");
        return customerTypeService.findAll();
        }

    /**
     * GET  /customer-types/:id : get the "id" customerType.
     *
     * @param id the id of the customerTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-types/{id}")
    @Timed
    public ResponseEntity<CustomerTypeDTO> getCustomerType(@PathVariable Long id) {
        log.debug("REST request to get CustomerType : {}", id);
        CustomerTypeDTO customerTypeDTO = customerTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerTypeDTO));
    }

    /**
     * DELETE  /customer-types/:id : delete the "id" customerType.
     *
     * @param id the id of the customerTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerType(@PathVariable Long id) {
        log.debug("REST request to delete CustomerType : {}", id);
        customerTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
