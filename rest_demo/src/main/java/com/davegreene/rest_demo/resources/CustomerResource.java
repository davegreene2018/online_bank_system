package com.davegreene.rest_demo.resources;

import com.davegreene.rest_demo.models.Customer;
import com.davegreene.rest_demo.services.CustomerService;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Date;


@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {
    
    CustomerService customerService = new CustomerService();
  
    @GET
    @Path("/customer")
    public List<Customer> getCustomers() {
        System.out.println("Getting customers");
        List<Customer> customerList = customerService.getAllCustomer();
        return customerList;
    }
    
    @GET
    @Path("/customer/{customerId}")
    public Customer getCustomer(@PathParam("customerId") int id) {
        System.out.println("Getting customer with ID="+id);
        return customerService.getCustomer(id);
    }
    
    @PUT
    @Path("/customer/{customerId}")
    public Customer setCustomer(@PathParam("customerId") int id, Customer m) {
        System.out.println("Updating customer with ID="+id);
        return customerService.updateCustomer(id,m);
    }

    @POST
    @Path("/customer")
    public Customer postCustomer(Customer m) {
        m.setDateAdded(new Date());
        System.out.println("Creating new customer");
	return customerService.createCustomer(m);
    }
    
    @DELETE 
    @Path("/customer/{customerId}")
    public Customer deleteCustomer(@PathParam("customerId") int id) {
        System.out.println("Deleting Customer "+id);
	Customer customer = customerService.deleteCustomer(id);
        return customer;
    }
}
