/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.models;

import java.util.List;
import javax.transaction.Transaction;

/**
 *
 * @author Daveg
 */
public class Account {
    
    private int accId;
    private String sortCode;
    private int accNum;
    private double curBal;
    private List<Transaction> transactions;
    private List<Account> accounts;

    public Account() {
    }

    public Account(int accId, String sortCode, int accNum, double curBal, List<Transaction> transactions, List<Account> accounts) {
        this.accId = accId;
        this.sortCode = sortCode;
        this.accNum = accNum;
        this.curBal = curBal;
        this.transactions = transactions;
        this.accounts = accounts;
    }

    public Account(int accId, String sortCode, int accNum, double curBal) {
        this.accId = accId;
        this.sortCode = sortCode;
        this.accNum = accNum;
        this.curBal = curBal;
    }


    public int getAccId() {
        return accId;
    }

    public void setAccId(int accId) {
        this.accId = accId;
    }

    public String getSortCode() {
        return sortCode;
    }

    public void setSortCode(String sortCode) {
        this.sortCode = sortCode;
    }

    public int getAccNum() {
        return accNum;
    }

    public void setAccNum(int accNum) {
        this.accNum = accNum;
    }

    public double getCurBal() {
        return curBal;
    }

    public void setCurBal(double curBal) {
        this.curBal = curBal;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
    
}
