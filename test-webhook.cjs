const payload = {
  eventId: "Q-" + Date.now().toString(),
  eventType: "FORM_RESPONSE",
  createdAt: new Date().toISOString(),
  data: {
    responseId: "R-" + Date.now().toString().slice(-6),
    submissionId: "S-" + Date.now().toString().slice(-6),
    formId: "PdY4B5",
    formName: "Client Details",
    createdAt: new Date().toISOString(),
    fields: [
      {
        key: "question_eEB7qo",
        label: "client_name",
        type: "INPUT_TEXT",
        value: "Test Client"
      },
      {
        key: "question_W0AMOQ",
        label: "client_website_type",
        type: "INPUT_TEXT",
        value: "ecommerce"
      },
      {
        key: "question_aGBDQy",
        label: "client_budget",
        type: "INPUT_NUMBER",
        value: 50000
      },
      {
        key: "question_6xdO85",
        label: "client_reference_website_name",
        type: "INPUT_TEXT",
        value: "Test Project"
      },
      {
        key: "question_7oZDWZ",
        label: "client_has_domain",
        type: "INPUT_TEXT",
        value: "no"
      },
      {
        key: "question_bLOk7L",
        label: "client_has_hosting",
        type: "INPUT_TEXT",
        value: "no"
      },
      {
        key: "question_7ZdVRz",
        label: "client_reference_website_url",
        type: "INPUT_LINK",
        value: "https://none.provided/"
      }
    ]
  }
};

const url = "https://n8n.getaipilot.in/webhook/e5d3d3a8-2851-4690-9467-d73ffb51f402";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})
.then(async (res) => {
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
})
.catch((err) => {
  console.error("Error:", err);
});
