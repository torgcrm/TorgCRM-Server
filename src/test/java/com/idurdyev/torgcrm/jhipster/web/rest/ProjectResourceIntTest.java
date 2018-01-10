package com.idurdyev.torgcrm.jhipster.web.rest;

import com.idurdyev.torgcrm.jhipster.TorgCrmApp;

import com.idurdyev.torgcrm.jhipster.domain.Project;
import com.idurdyev.torgcrm.jhipster.repository.ProjectRepository;
import com.idurdyev.torgcrm.jhipster.service.ProjectService;
import com.idurdyev.torgcrm.jhipster.service.dto.ProjectDTO;
import com.idurdyev.torgcrm.jhipster.service.mapper.ProjectMapper;
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
 * Test class for the ProjectResource REST controller.
 *
 * @see ProjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TorgCrmApp.class)
public class ProjectResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_INDUSTRY = "AAAAAAAAAA";
    private static final String UPDATED_INDUSTRY = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProjectMockMvc;

    private Project project;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectResource projectResource = new ProjectResource(projectService);
        this.restProjectMockMvc = MockMvcBuilders.standaloneSetup(projectResource)
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
    public static Project createEntity(EntityManager em) {
        Project project = new Project()
            .name(DEFAULT_NAME)
            .industry(DEFAULT_INDUSTRY)
            .code(DEFAULT_CODE);
        return project;
    }

    @Before
    public void initTest() {
        project = createEntity(em);
    }

    @Test
    @Transactional
    public void createProject() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(project);
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate + 1);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProject.getIndustry()).isEqualTo(DEFAULT_INDUSTRY);
        assertThat(testProject.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectRepository.findAll().size();

        // Create the Project with an existing ID
        project.setId(1L);
        ProjectDTO projectDTO = projectMapper.toDto(project);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectMockMvc.perform(post("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProjects() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get all the projectList
        restProjectMockMvc.perform(get("/api/projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(project.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].industry").value(hasItem(DEFAULT_INDUSTRY.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);

        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", project.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(project.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.industry").value(DEFAULT_INDUSTRY.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProject() throws Exception {
        // Get the project
        restProjectMockMvc.perform(get("/api/projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Update the project
        Project updatedProject = projectRepository.findOne(project.getId());
        // Disconnect from session so that the updates on updatedProject are not directly saved in db
        em.detach(updatedProject);
        updatedProject
            .name(UPDATED_NAME)
            .industry(UPDATED_INDUSTRY)
            .code(UPDATED_CODE);
        ProjectDTO projectDTO = projectMapper.toDto(updatedProject);

        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isOk());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate);
        Project testProject = projectList.get(projectList.size() - 1);
        assertThat(testProject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProject.getIndustry()).isEqualTo(UPDATED_INDUSTRY);
        assertThat(testProject.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingProject() throws Exception {
        int databaseSizeBeforeUpdate = projectRepository.findAll().size();

        // Create the Project
        ProjectDTO projectDTO = projectMapper.toDto(project);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProjectMockMvc.perform(put("/api/projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectDTO)))
            .andExpect(status().isCreated());

        // Validate the Project in the database
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProject() throws Exception {
        // Initialize the database
        projectRepository.saveAndFlush(project);
        int databaseSizeBeforeDelete = projectRepository.findAll().size();

        // Get the project
        restProjectMockMvc.perform(delete("/api/projects/{id}", project.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Project> projectList = projectRepository.findAll();
        assertThat(projectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = new Project();
        project1.setId(1L);
        Project project2 = new Project();
        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);
        project2.setId(2L);
        assertThat(project1).isNotEqualTo(project2);
        project1.setId(null);
        assertThat(project1).isNotEqualTo(project2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectDTO.class);
        ProjectDTO projectDTO1 = new ProjectDTO();
        projectDTO1.setId(1L);
        ProjectDTO projectDTO2 = new ProjectDTO();
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
        projectDTO2.setId(projectDTO1.getId());
        assertThat(projectDTO1).isEqualTo(projectDTO2);
        projectDTO2.setId(2L);
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
        projectDTO1.setId(null);
        assertThat(projectDTO1).isNotEqualTo(projectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(projectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(projectMapper.fromId(null)).isNull();
    }
}
