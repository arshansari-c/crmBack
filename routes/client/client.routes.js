import express from 'express'
import { verifyAdminAuth } from '../../middlewares/admin/verifyAdminAuth.js'
import { addCustomer, fetchAllCustomers } from '../../controllers/client/client.Controller.js'
import { AddProposal, fetchUsersProposals } from '../../controllers/client/Proposal.Controller.js'
import { addPackages, fetchPackages } from '../../controllers/client/Packages.controller.js'
import { addClientEstimateAndSave, fetchEstimates } from '../../controllers/client/Estimate.Controller.js'
import { addClientInvoicesAndSend, fetchInvoiceList } from '../../controllers/client/Invoice.Controller.js'
import { addClientCreditNote, fetchClientNotes } from '../../controllers/client/Credit_note.Controller.js'
import { addClientExpense, fetchClientExpense } from '../../controllers/client/Expense.Controller.js'
import { addClientContract, fetchContract } from '../../controllers/client/Contract.controller.js'
import { addClientProject, fetchClientProject } from '../../controllers/client/Project.Controller.js'
import { addClientTask, fetchTasks } from '../../controllers/client/Task.Controller.js'
import { addClientTicket, fetchTickets } from '../../controllers/client/Ticket.Controller.js'
import { addLeads, fetchLeads } from '../../controllers/client/Lead.Controller.js'
import { addKnowledgeRequest, fetchKnowledgeRequest } from '../../controllers/client/KnowlageRequest.Controller.js'
import { addHotel, fetchHotels, fetchHotelsLists } from '../../controllers/client/Hotel.Controller.js'
import { CreditNotes } from '../../models/client/Credit_note.model.js'
import { fetchAllItems } from '../../controllers/client/All_Items.Controller.js'

export const ClientRouter = express.Router()

ClientRouter.post('/addClient',verifyAdminAuth,addCustomer)
ClientRouter.get('/fetchcustomers',verifyAdminAuth,fetchAllCustomers)
ClientRouter.post('/addproposal',verifyAdminAuth,AddProposal)
ClientRouter.get('/fetchproposals',verifyAdminAuth,fetchUsersProposals)
ClientRouter.post('/addpackages',verifyAdminAuth,addPackages)
ClientRouter.post('/estimate',verifyAdminAuth,addClientEstimateAndSave)
ClientRouter.post('/invoice',verifyAdminAuth,addClientInvoicesAndSend)
ClientRouter.post('/creditnote',verifyAdminAuth,addClientCreditNote)
ClientRouter.post('/expense',verifyAdminAuth,addClientExpense)
ClientRouter.post('/contract',verifyAdminAuth,addClientContract)
ClientRouter.post('/project',verifyAdminAuth,addClientProject)
ClientRouter.post('/task',verifyAdminAuth,addClientTask)
ClientRouter.post('/ticket',verifyAdminAuth,addClientTicket)
ClientRouter.post('/lead',verifyAdminAuth,addLeads)
ClientRouter.post('/artical',verifyAdminAuth,addKnowledgeRequest)
ClientRouter.post('/addhotels',verifyAdminAuth,addHotel)
ClientRouter.get('/fetchhotels',verifyAdminAuth,fetchHotels)
ClientRouter.get("/fetchpackages",verifyAdminAuth,fetchPackages)
ClientRouter.get('/fetchhotelslist',verifyAdminAuth,fetchHotelsLists)
ClientRouter.get('/fetchestimate',verifyAdminAuth,fetchEstimates)
ClientRouter.get('/fetchinvoices',verifyAdminAuth,fetchInvoiceList)
ClientRouter.get('/fetchcreditnote',verifyAdminAuth,fetchClientNotes)
ClientRouter.get('/fetchexpense',verifyAdminAuth,fetchClientExpense)
ClientRouter.get('/fetchcontract',verifyAdminAuth,fetchContract)
ClientRouter.get('/fetchproject',verifyAdminAuth,fetchClientProject)
ClientRouter.get('/fetchtask',verifyAdminAuth,fetchTasks)
ClientRouter.get('/fetchtickets',verifyAdminAuth,fetchTickets)
ClientRouter.get('/fetchleads',verifyAdminAuth,fetchLeads)
ClientRouter.get('/fetchknowlage',verifyAdminAuth,fetchKnowledgeRequest)
ClientRouter.get('/fetchallitems',verifyAdminAuth,fetchAllItems)