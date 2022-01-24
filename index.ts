import { GoogleAdsApi } from 'google-ads-api'
import { errors } from "google-ads-api";
import { enums } from "google-ads-api"
import {} from 'dotenv/config'




const client = new GoogleAdsApi({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    developer_token: process.env.CUSTOMER_ID_M,
})

const customer = client.Customer({
  customer_id: process.env.CUSTOMER_ID,
  refresh_token: process.env.REFRESH_TOKEN
});

async function listCustomers() {
  const refreshToken =  process.env.REFRESH_TOKEN

  const customers = await client.listAccessibleCustomers(refreshToken)
  
  return console.log(customers)
}

listCustomers()

async function getData() {

  const campaigns = customer.report({
    entity: "campaign",
    attributes: [
      "campaign.id",
      "campaign.name",
      "campaign.bidding_strategy_type",
      "campaign_budget.amount_micros",
    ],
    metrics: [
      "metrics.cost_micros",
      "metrics.clicks",
      "metrics.impressions",
      "metrics.all_conversions",
    ],
    constraints: {
      "campaign.status": enums.CampaignStatus.ENABLED,
    },
    limit: 20,
  });
  
  return campaigns

}




getData()

// async function getData() {

//   const campaigns = await customer.query(`
//   SELECT campaign.status, metrics.impressions
//   FROM campaign
//   WHERE segments.date DURING LAST_14_DAYS
// `);

//   return console.log(campaigns)
  
// }