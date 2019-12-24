package com.davegreene.rest_demo.models;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ArrayList;


public class Customer {
    
    private int id;
    private String accountName;
    private String address;
    private String email;
    private String password;
    private Date dateAdded;
    private String functions;
    
    public Customer() {
    }

    public Customer(int id, String accountName, String address, String email, String password) {
        this.id = id;
        this.accountName = accountName;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateAdded = new Date();
        

    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }    
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateadded) {
        this.dateAdded = dateadded;
    }
    
   
    
    public String getFunctions() {
        functions = "<div class='function_buttons'><ul>";
        functions += "<li class='function_edit'><a data-id='"+id+" 'data-name='"+accountName+"'><span>Edit</span></a></li>";
        functions += "<li class='function_delete'><a data-id='"+id+" 'data-name='"+accountName+"'><span>Delete</span></a></li>";
        functions += "</ul></div>";
        return functions;
    }
    
    private void setFunctions(String functions) {
        // dummy setter 
    }
}
