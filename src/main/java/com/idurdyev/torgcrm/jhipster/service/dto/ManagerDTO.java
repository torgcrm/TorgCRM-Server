package com.idurdyev.torgcrm.jhipster.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Manager entity.
 */
public class ManagerDTO implements Serializable {

    private Long id;

    private String fullname;

    private String comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ManagerDTO managerDTO = (ManagerDTO) o;
        if(managerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), managerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ManagerDTO{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
