# 📄 Automated Invoice Generation and Email System

### **Project Category:** Workflow Automation, Business Operations

---

## 🧭 Introduction

Consulting and service-based businesses often need to send out periodic invoices to clients. Manually creating and sending these invoices every month is a repetitive, time-consuming task prone to human error. This project aims to automate the **monthly invoice generation** and **emailing process** for **FEX STOCK**, a Kolkata-based Forex consultancy firm.

Using **Google Sheets** as a central data source and **Google Apps Script** for automation, I built a robust system that dynamically creates professional PDF invoices and emails them to respective clients—all with just a single click or scheduled trigger.

---

## 📁 Project Overview

This project eliminates the repetitive, manual effort of generating client invoices and emailing them every month. It uses Google Sheets as a data source, generates PDF invoices dynamically using Apps Script, and emails them to clients with just one click — or on an automated schedule.

---

## 🧰 Tools & Technologies Used

- Google Sheets  
- Google Apps Script  
- GmailApp API  
- HTML-to-PDF via `Utilities.newBlob()`  

---

## 📊 Dataset Structure

The billing data is maintained in a Google Sheet with the following columns:

| Column Name        | Description                                       |
|--------------------|---------------------------------------------------|
| Bill No            | Unique invoice number                             |
| Client Name        | Name of the client                                |
| Client Address     | Full address (multi-line supported)               |
| Month              | Billing month                                     |
| Amount             | Invoice amount in numbers                         |
| Amount in Words    | Invoice amount in words                           |
| Email              | Recipient email address                           |
| Send               | Boolean flag to trigger invoice generation        |

Each row represents a billing record for one client for one month.

---

## ⚙️ Automation Workflow

The system consists of four key functions:

### 1. 📄 `generateInvoicePDF()`

- Builds a professional invoice layout in HTML.
- Fills dynamic details like bill number, client address, month, and amount.
- Matches the original invoice format used by the company.
- Converts the HTML to a PDF using `Utilities.newBlob()`.

### 2. 📬 `sendInvoices()`

- Scans the sheet for rows where `Send = TRUE`.
- For each such row:
  - Calls `generateInvoicePDF()` to create the invoice.
  - Sends the PDF as an attachment via GmailApp.
  - Marks the row’s `Send` column to `FALSE` after successful send.

### 3. 🟢 `markNextInvoiceToSend()`

- Automatically identifies the **next unsent invoice row** (where `Send` is blank or FALSE).
- Marks it as `TRUE`, queuing it for the next invoice cycle.
- Ensures only **one new row is marked TRUE** each month.
- Runs via a monthly trigger (e.g., 1st of every month).

### 4. ⏰ **Scheduling with Triggers**

- Time-driven trigger runs `markNextInvoiceToSend()` monthly.
- Optionally, another trigger can run `sendInvoices()` automatically.
- Enables a **fully autonomous monthly billing pipeline**.

---

## 🖨️ Invoice Output Format

The invoice PDF matches the original company layout:

- **Header**: Company name, services offered, and address.
- **Client Details**: Name, address, and bill number/date.
- **Description**: Month-specific consultancy fee notes.
- **Amount Section**: Amount in numbers and words.
- **Footer**: Payment instructions, PAN number, proprietor details, and signature.

**Filename Format**:
- Invoice_BillNo_Month.pdf

---

## ✅ Features

| Feature               | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| 🔁 Fully Automated     | Just one click or schedule takes care of the entire process        |
| 📄 Professional Output | Maintains layout consistency with official invoice templates       |
| 📬 Gmail Integration   | Uses GmailApp to send invoice PDFs as attachments                  |
| ✅ Status Tracking     | Marks rows as sent to prevent duplication                          |
| 🟢 Smart Send Queue    | Automatically marks only the next invoice row for sending          |
| 🔒 Secure & Serverless | Entirely within Google Workspace, no external dependencies         |

---

## 🧠 What I Learned

- Real-world scripting with **Google Apps Script**  
- HTML layouting for **dynamic PDF generation**  
- Automating workflows with **Gmail integration**  
- Writing modular, reusable functions  
- Working with **time-based triggers** in Google Cloud  

---

## 📈 Impact

- ⏱️ Reduced 90% of time spent on monthly invoicing  
- 🧾 Maintained professional formatting across clients  
- 🧘🏽‍♂️ Eliminated manual follow-ups and email mistakes  
- 🔁 Made the process scalable with growing client base  

---

## 📂 Project Structure

📄 Google Sheet (Invoices)
- ├── Bill No
- ├── Client Name
- ├── ...
- └── Send

📜 Apps Script Functions
- ├── generateInvoicePDF()
- ├── sendInvoices()
- └── markNextInvoiceToSend()

⏰ Triggers
- ├── Monthly markNextInvoiceToSend()
- └── Monthly sendInvoices()


---

## 🚀 Future Enhancements

- Add itemized line items for multi-service billing  
- Include digital signature and company logo  
- Add SMS reminders using Twilio or WhatsApp  
- Store send logs with timestamp and status  
- Build a form-based entry or AppSheet interface for invoice data  

---

## 🔗 Live Demo / Repository

> _Optional_: Add a link to a demo video, sample PDF, or public copy of the Google Sheet (read-only).

---

## 🧑‍💼 Built For

**Client**: FEX STOCK  
**Sector**: Forex & Financial Consultancy  
**Location**: Kolkata, India  

---

## 👋 Contact

**Author**: Rudrajit Bhattacharyya  
**Email**: rudrajitb24@gmail.com  
**LinkedIn**: [linkedin.com/in/rudrajitb24](https://www.linkedin.com/in/rudrajitb24)  
**GitHub**: [github.com/Rudrajit12](https://github.com/Rudrajit12)
