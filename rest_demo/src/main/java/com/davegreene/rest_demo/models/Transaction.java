/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.models;

import java.util.Date;

/**
 *
 * @author Daveg
 */
public class Transaction {
    
    private int id;
    //transType include: debit,credit
    private String transType;
    //private Date TransCreated;
    private Date date;
    private String desc;
    private double postBalance;
    private String functions;

    public Transaction() {
    }

    public Transaction(int id, String transType, Date date, String desc, double postBalance) {
        this.id = id;
        this.transType = transType;
        this.date = date;
        this.desc = desc;
        this.postBalance = postBalance;
    }

    public Transaction(int id, String transType, String desc, double postBalance) {
        this.id = id;
        this.transType = transType;
        this.desc = desc;
        this.postBalance = postBalance;
    }

    public int getTransId() {
        return id;
    }

    public void setTransId(int id) {
        this.id = id;
    }

    public String getTransType() {
        return transType;
    }

    public void setTransType(String transType) {
        this.transType = transType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public double getPostBalance() {
        return postBalance;
    }

    public void setPostBalance(double postBalance) {
        this.postBalance = postBalance;
    }
    
    public String getFunctions() {
        functions = "<div class='function_buttons'><ul>";
        functions += "<li class='function_edit'><a data-id='"+id+" 'data-name='"+transType+"'><span>Edit</span></a></li>";
        functions += "<li class='function_delete'><a data-id='"+id+" 'data-name='"+transType+"'><span>Delete</span></a></li>";
        functions += "</ul></div>";
        return functions;
    }
    
    private void setFunctions(String functions) {
        // dummy setter 
    }
    
}
