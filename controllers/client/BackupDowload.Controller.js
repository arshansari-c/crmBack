import mongoose from "mongoose";
import { AddCustomerModel } from "../../models/client/AddCustomer.model.js";
import { Announcement } from "../../models/client/Announcement.model.js";
import { ContractModel } from "../../models/client/Contracts.model.js";
import { CreditNotes } from "../../models/client/Credit_note.model.js";
import { EstimateModel } from "../../models/client/Estimate.model.js";
import { ExpenseModel } from "../../models/client/Expense.model.js";
import { Goals } from "../../models/client/Goal.model.js";
import HotelsModel from "../../models/client/Hotels.model.js";
import { InvoiceModel } from "../../models/client/Invoices.model.js";
import { KnowledgeRequestModel } from "../../models/client/KnowlageRequest.model.js";
import { LeadModel } from "../../models/client/Lead.model.js";
import { TravelPackageModel } from "../../models/client/Packages.model.js";
import { ProjectModel } from "../../models/client/Projects.model.js";
import { ProposalModel } from "../../models/client/Proposal.model.js";
import { TaskModel } from "../../models/client/task.model.js";
import { TicketModel } from "../../models/client/Ticket.model.js";

export const BackupDatabaseDownload = async (req, res) => {
  try {
    // Fetch all data from each model
    const [
      customers,
      announcements,
      contracts,
      creditNotes,
      estimates,
      expenses,
      goals,
      hotels,
      invoices,
      knowledgeRequests,
      leads,
      travelPackages,
      projects,
      proposals,
      tasks,
      tickets
    ] = await Promise.all([
      AddCustomerModel.find({}).lean(),
      Announcement.find({}).lean(),
      ContractModel.find({}).lean(),
      CreditNotes.find({}).lean(),
      EstimateModel.find({}).lean(),
      ExpenseModel.find({}).lean(),
      Goals.find({}).lean(),
      HotelsModel.find({}).lean(),
      InvoiceModel.find({}).lean(),
      KnowledgeRequestModel.find({}).lean(),
      LeadModel.find({}).lean(),
      TravelPackageModel.find({}).lean(),
      ProjectModel.find({}).lean(),
      ProposalModel.find({}).lean(),
      TaskModel.find({}).lean(),
      TicketModel.find({}).lean()
    ]);

    // Structure the backup data
    const backupData = {
      metadata: {
        backupDate: new Date().toISOString(),
        totalRecords: {
          customers: customers.length,
          announcements: announcements.length,
          contracts: contracts.length,
          creditNotes: creditNotes.length,
          estimates: estimates.length,
          expenses: expenses.length,
          goals: goals.length,
          hotels: hotels.length,
          invoices: invoices.length,
          knowledgeRequests: knowledgeRequests.length,
          leads: leads.length,
          travelPackages: travelPackages.length,
          projects: projects.length,
          proposals: proposals.length,
          tasks: tasks.length,
          tickets: tickets.length
        }
      },
      data: {
        customers,
        announcements,
        contracts,
        creditNotes,
        estimates,
        expenses,
        goals,
        hotels,
        invoices,
        knowledgeRequests,
        leads,
        travelPackages,
        projects,
        proposals,
        tasks,
        tickets
      }
    };

    // Set response headers for JSON download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=backup-${new Date().toISOString().split('T')[0]}.json`);

    // Send the JSON data
    res.status(200).send(JSON.stringify(backupData, null, 2));
  } catch (error) {
    console.log("BackupDatabaseDownload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};