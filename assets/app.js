Vue.createApp({
  data() {
    return {
      customers: [],
      customerID: 0,
      customer: {
        Name: '',
        Email: '',
        AddressID: 0,
        BillingAddressID: 0,
      },

      address: {
        StreetNr: '',
        ZIP: '',
        City: '',
        CountrID: 'CHE'
      },
      countries: [],
      message: '',
    }
  },
  methods: {
    async loadCustomers() {
      const url = "https://api-sbw-plc.sbw.media/Customer";
      const response = await fetch(url);
      const data = await response.json();
      this.customers = data.resources;
    },
    async loadCountries() {
      const url = "https://api-sbw-plc.sbw.media/Country";
      const response = await fetch(url);
      const data = await response.json();
      this.countries = data.resources;
    },
    async saveCustomer() {
      const url = "https://api-sbw-plc.sbw.media/Customer";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.customer)
      });
      const result = await response.json();
      if (!result.result) {
        this.message = result.message;
      } else {
        this.loadCustomers();
      }
    },
    async deleteCustomer(customerID) {
      const url = "https://api-sbw-plc.sbw.media/Customer/" + customerID;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (!result.result) {
        this.message = result.message;
      } else {
        this.loadCustomers();
      }
    },
    async updateCustomer(customerID) {
      const url = "https://api-sbw-plc.sbw.media/Customer/" + customerID;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.customer)
      });
      const result = await response.json();
      if (!result.result) {
        this.message = result.message;
      } else {
        this.loadCustomers();
      }
    }
  },
  mounted() {
    this.loadCustomers();
    this.loadCountries();
  }
}).mount('customer-app')