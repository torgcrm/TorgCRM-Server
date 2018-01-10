package com.idurdyev.torgcrm.jhipster.web.rest;

import com.idurdyev.torgcrm.jhipster.TorgCrmApp;

import com.idurdyev.torgcrm.jhipster.domain.Deal;
import com.idurdyev.torgcrm.jhipster.repository.DealRepository;
import com.idurdyev.torgcrm.jhipster.service.DealService;
import com.idurdyev.torgcrm.jhipster.service.dto.DealDTO;
import com.idurdyev.torgcrm.jhipster.service.mapper.DealMapper;
import com.idurdyev.torgcrm.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.idurdyev.torgcrm.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DealResource REST controller.
 *
 * @see DealResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgCrmApp.class)
public class DealResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private DealMapper dealMapper;

    @Autowired
    private DealService dealService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDealMockMvc;

    private Deal deal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DealResource dealResource = new DealResource(dealService);
        this.restDealMockMvc = MockMvcBuilders.standaloneSetup(dealResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deal createEntity(EntityManager em) {
        Deal deal = new Deal()
            .title(DEFAULT_TITLE);
        return deal;
    }

    @Before
    public void initTest() {
        deal = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeal() throws Exception {
        int databaseSizeBeforeCreate = dealRepository.findAll().size();

        // Create the Deal
        DealDTO dealDTO = dealMapper.toDto(deal);
        restDealMockMvc.perform(post("/api/deals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealDTO)))
            .andExpect(status().isCreated());

        // Validate the Deal in the database
        List<Deal> dealList = dealRepository.findAll();
        assertThat(dealList).hasSize(databaseSizeBeforeCreate + 1);
        Deal testDeal = dealList.get(dealList.size() - 1);
        assertThat(testDeal.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createDealWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dealRepository.findAll().size();

        // Create the Deal with an existing ID
        deal.setId(1L);
        DealDTO dealDTO = dealMapper.toDto(deal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDealMockMvc.perform(post("/api/deals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Deal in the database
        List<Deal> dealList = dealRepository.findAll();
        assertThat(dealList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeals() throws Exception {
        // Initialize the database
        dealRepository.saveAndFlush(deal);

        // Get all the dealList
        restDealMockMvc.perform(get("/api/deals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deal.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getDeal() throws Exception {
        // Initialize the database
        dealRepository.saveAndFlush(deal);

        // Get the deal
        restDealMockMvc.perform(get("/api/deals/{id}", deal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deal.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeal() throws Exception {
        // Get the deal
        restDealMockMvc.perform(get("/api/deals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeal() throws Exception {
        // Initialize the database
        dealRepository.saveAndFlush(deal);
        int databaseSizeBeforeUpdate = dealRepository.findAll().size();

        // Update the deal
        Deal updatedDeal = dealRepository.findOne(deal.getId());
        // Disconnect from session so that the updates on updatedDeal are not directly saved in db
        em.detach(updatedDeal);
        updatedDeal
            .title(UPDATED_TITLE);
        DealDTO dealDTO = dealMapper.toDto(updatedDeal);

        restDealMockMvc.perform(put("/api/deals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealDTO)))
            .andExpect(status().isOk());

        // Validate the Deal in the database
        List<Deal> dealList = dealRepository.findAll();
        assertThat(dealList).hasSize(databaseSizeBeforeUpdate);
        Deal testDeal = dealList.get(dealList.size() - 1);
        assertThat(testDeal.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingDeal() throws Exception {
        int databaseSizeBeforeUpdate = dealRepository.findAll().size();

        // Create the Deal
        DealDTO dealDTO = dealMapper.toDto(deal);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDealMockMvc.perform(put("/api/deals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dealDTO)))
            .andExpect(status().isCreated());

        // Validate the Deal in the database
        List<Deal> dealList = dealRepository.findAll();
        assertThat(dealList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeal() throws Exception {
        // Initialize the database
        dealRepository.saveAndFlush(deal);
        int databaseSizeBeforeDelete = dealRepository.findAll().size();

        // Get the deal
        restDealMockMvc.perform(delete("/api/deals/{id}", deal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Deal> dealList = dealRepository.findAll();
        assertThat(dealList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deal.class);
        Deal deal1 = new Deal();
        deal1.setId(1L);
        Deal deal2 = new Deal();
        deal2.setId(deal1.getId());
        assertThat(deal1).isEqualTo(deal2);
        deal2.setId(2L);
        assertThat(deal1).isNotEqualTo(deal2);
        deal1.setId(null);
        assertThat(deal1).isNotEqualTo(deal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DealDTO.class);
        DealDTO dealDTO1 = new DealDTO();
        dealDTO1.setId(1L);
        DealDTO dealDTO2 = new DealDTO();
        assertThat(dealDTO1).isNotEqualTo(dealDTO2);
        dealDTO2.setId(dealDTO1.getId());
        assertThat(dealDTO1).isEqualTo(dealDTO2);
        dealDTO2.setId(2L);
        assertThat(dealDTO1).isNotEqualTo(dealDTO2);
        dealDTO1.setId(null);
        assertThat(dealDTO1).isNotEqualTo(dealDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(dealMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(dealMapper.fromId(null)).isNull();
    }
}
