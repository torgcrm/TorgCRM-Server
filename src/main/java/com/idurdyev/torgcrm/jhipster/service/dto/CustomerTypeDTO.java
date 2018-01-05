package com.idurdyev.torgcrm.jhipster.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CustomerType entity.
 */
public class CustomerTypeDTO implements Serializable {

    private Long id;

    private String code;

    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerTypeDTO customerTypeDTO = (CustomerTypeDTO) o;
        if(customerTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerTypeDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
