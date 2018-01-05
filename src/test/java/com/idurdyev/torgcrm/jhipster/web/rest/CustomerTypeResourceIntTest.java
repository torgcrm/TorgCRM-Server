package com.idurdyev.torgcrm.jhipster.web.rest;

import com.idurdyev.torgcrm.jhipster.TorgCrmApp;

import com.idurdyev.torgcrm.jhipster.domain.CustomerType;
import com.idurdyev.torgcrm.jhipster.repository.CustomerTypeRepository;
import com.idurdyev.torgcrm.jhipster.service.CustomerTypeService;
import com.idurdyev.torgcrm.jhipster.service.dto.CustomerTypeDTO;
import com.idurdyev.torgcrm.jhipster.service.mapper.CustomerTypeMapper;
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
 * Test class for the CustomerTypeResource REST controller.
 *
 * @see CustomerTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgCrmApp.class)
public class CustomerTypeResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private CustomerTypeRepository customerTypeRepository;

    @Autowired
    private CustomerTypeMapper customerTypeMapper;

    @Autowired
    private CustomerTypeService customerTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerTypeMockMvc;

    private CustomerType customerType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerTypeResource customerTypeResource = new CustomerTypeResource(customerTypeService);
        this.restCustomerTypeMockMvc = MockMvcBuilders.standaloneSetup(customerTypeResource)
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
    public static CustomerType createEntity(EntityManager em) {
        CustomerType customerType = new CustomerType()
            .code(DEFAULT_CODE)
            .value(DEFAULT_VALUE);
        return customerType;
    }

    @Before
    public void initTest() {
        customerType = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerType() throws Exception {
        int databaseSizeBeforeCreate = customerTypeRepository.findAll().size();

        // Create the CustomerType
        CustomerTypeDTO customerTypeDTO = customerTypeMapper.toDto(customerType);
        restCustomerTypeMockMvc.perform(post("/api/customer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerType in the database
        List<CustomerType> customerTypeList = customerTypeRepository.findAll();
        assertThat(customerTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerType testCustomerType = customerTypeList.get(customerTypeList.size() - 1);
        assertThat(testCustomerType.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testCustomerType.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createCustomerTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerTypeRepository.findAll().size();

        // Create the CustomerType with an existing ID
        customerType.setId(1L);
        CustomerTypeDTO customerTypeDTO = customerTypeMapper.toDto(customerType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerTypeMockMvc.perform(post("/api/customer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerType in the database
        List<CustomerType> customerTypeList = customerTypeRepository.findAll();
        assertThat(customerTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomerTypes() throws Exception {
        // Initialize the database
        customerTypeRepository.saveAndFlush(customerType);

        // Get all the customerTypeList
        restCustomerTypeMockMvc.perform(get("/api/customer-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerType.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getCustomerType() throws Exception {
        // Initialize the database
        customerTypeRepository.saveAndFlush(customerType);

        // Get the customerType
        restCustomerTypeMockMvc.perform(get("/api/customer-types/{id}", customerType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerType.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerType() throws Exception {
        // Get the customerType
        restCustomerTypeMockMvc.perform(get("/api/customer-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerType() throws Exception {
        // Initialize the database
        customerTypeRepository.saveAndFlush(customerType);
        int databaseSizeBeforeUpdate = customerTypeRepository.findAll().size();

        // Update the customerType
        CustomerType updatedCustomerType = customerTypeRepository.findOne(customerType.getId());
        // Disconnect from session so that the updates on updatedCustomerType are not directly saved in db
        em.detach(updatedCustomerType);
        updatedCustomerType
            .code(UPDATED_CODE)
            .value(UPDATED_VALUE);
        CustomerTypeDTO customerTypeDTO = customerTypeMapper.toDto(updatedCustomerType);

        restCustomerTypeMockMvc.perform(put("/api/customer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerTypeDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerType in the database
        List<CustomerType> customerTypeList = customerTypeRepository.findAll();
        assertThat(customerTypeList).hasSize(databaseSizeBeforeUpdate);
        CustomerType testCustomerType = customerTypeList.get(customerTypeList.size() - 1);
        assertThat(testCustomerType.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testCustomerType.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerType() throws Exception {
        int databaseSizeBeforeUpdate = customerTypeRepository.findAll().size();

        // Create the CustomerType
        CustomerTypeDTO customerTypeDTO = customerTypeMapper.toDto(customerType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomerTypeMockMvc.perform(put("/api/customer-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerType in the database
        List<CustomerType> customerTypeList = customerTypeRepository.findAll();
        assertThat(customerTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomerType() throws Exception {
        // Initialize the database
        customerTypeRepository.saveAndFlush(customerType);
        int databaseSizeBeforeDelete = customerTypeRepository.findAll().size();

        // Get the customerType
        restCustomerTypeMockMvc.perform(delete("/api/customer-types/{id}", customerType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerType> customerTypeList = customerTypeRepository.findAll();
        assertThat(customerTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerType.class);
        CustomerType customerType1 = new CustomerType();
        customerType1.setId(1L);
        CustomerType customerType2 = new CustomerType();
        customerType2.setId(customerType1.getId());
        assertThat(customerType1).isEqualTo(customerType2);
        customerType2.setId(2L);
        assertThat(customerType1).isNotEqualTo(customerType2);
        customerType1.setId(null);
        assertThat(customerType1).isNotEqualTo(customerType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerTypeDTO.class);
        CustomerTypeDTO customerTypeDTO1 = new CustomerTypeDTO();
        customerTypeDTO1.setId(1L);
        CustomerTypeDTO customerTypeDTO2 = new CustomerTypeDTO();
        assertThat(customerTypeDTO1).isNotEqualTo(customerTypeDTO2);
        customerTypeDTO2.setId(customerTypeDTO1.getId());
        assertThat(customerTypeDTO1).isEqualTo(customerTypeDTO2);
        customerTypeDTO2.setId(2L);
        assertThat(customerTypeDTO1).isNotEqualTo(customerTypeDTO2);
        customerTypeDTO1.setId(null);
        assertThat(customerTypeDTO1).isNotEqualTo(customerTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerTypeMapper.fromId(null)).isNull();
    }
}
