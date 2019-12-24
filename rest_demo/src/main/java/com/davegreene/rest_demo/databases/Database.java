/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.databases;


import com.davegreene.rest_demo.models.Account;
import com.davegreene.rest_demo.models.Customer;
import java.util.ArrayList;
import java.util.List;

public class Database {
    public static List<Customer> customerDB = new ArrayList<>();
    public static List<Account> accountDB = new ArrayList<>();
    public static boolean init = true;
     
    // Lets create a constructor for the class
    public Database () {
      if (init) {
          
        Customer a1 = new Customer(1,"Dave Greene", "Dublin 24","dave@gmail.com","dave2019");
        customerDB.add(a1);
        Customer a2 = new Customer(2,"John Brennan", "Dublin","john@gmail.com","john2019");   
         customerDB.add(a2);
        Customer a3 = new Customer(3,"Joseph Fahey ", "Dublin","Joseph@gmail.com","Joseph2019");
         customerDB.add(a3);
        Customer a4 = new Customer(4,"Liyuan Zhang", "Dublin","Liyuan@gmail.com","Liyuan2019");
         customerDB.add(a4);
        Customer a5 = new Customer(5,"Ronan Murray", "Dublin","Ronan@gmail.com","Ronan2019");
         customerDB.add(a5);
      
        init = false;
      }
    }
    
    public static List<Customer> getCustomerDB() {
        return  customerDB;
    }
    
    public static List<Account> getAccountDB() {
        return  accountDB;
    }
    
}
