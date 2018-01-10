package com.idurdyev.torgcrm.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.idurdyev.torgcrm.jhipster.domain.enumeration.TaskType;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "begin_date")
    private LocalDate beginDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "jhi_comment")
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TaskType type;

    @ManyToOne
    private Manager manager;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Task title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public Task beginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
        return this;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Task endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getComment() {
        return comment;
    }

    public Task comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public TaskType getType() {
        return type;
    }

    public Task type(TaskType type) {
        this.type = type;
        return this;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public Manager getManager() {
        return manager;
    }

    public Task manager(Manager manager) {
        this.manager = manager;
        return this;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", beginDate='" + getBeginDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
