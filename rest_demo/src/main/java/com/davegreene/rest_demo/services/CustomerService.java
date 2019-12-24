/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.services;

import com.davegreene.rest_demo.models.Customer;
import com.davegreene.rest_demo.models.Customer;
import com.davegreene.rest_demo.databases.Database;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class CustomerService {
          
    Database d = new Database();
    private List<Customer> customerList = d.getCustomerDB();
    
    public List<Customer> getAllCustomer() {
        return customerList;
    }
        
    public Customer getCustomer(int id) {
        return customerList.get(id-1);
    }
    
    public Customer createCustomer(Customer m) {
	m.setId(customerList.size() + 1);
	customerList.add(m);
	return m;
    }
    
    public Customer updateCustomer(int id, Customer m) {
       Date dateAdded = customerList.get(id-1).getDateAdded();
       m.setDateAdded(dateAdded);
       customerList.set(id-1,m);
       return m;
    }
   
    public Customer deleteCustomer(int id) {
       Customer customer = customerList.get(id-1);
       customerList.remove(customer);
       return customer;
    }
}
