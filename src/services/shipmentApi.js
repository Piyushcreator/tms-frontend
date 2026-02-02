import { gqlRequest } from "./graphqlClient.js";

const SHIPMENTS_QUERY = `
query Shipments($filter: ShipmentFilter, $pagination: PaginationInput, $sort: ShipmentSort) {
  shipments(filter: $filter, pagination: $pagination, sort: $sort) {
    totalCount
    limit
    offset
    nodes {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      pickupDate
      deliveryDate
      status
      rateUsd
      trackingNumber
      reference
      weightKg
      notes
      createdAt
      updatedAt
    }
  }
}
`;

const SHIPMENT_QUERY = `
query Shipment($id: ID!) {
  shipment(id: $id) {
    id
    shipperName
    carrierName
    pickupLocation
    deliveryLocation
    pickupDate
    deliveryDate
    status
    rateUsd
    trackingNumber
    reference
    weightKg
    notes
    createdAt
    updatedAt
  }
}
`;

export async function fetchShipments({ token, q = "", status = null, limit = 50, offset = 0 } = {}) {
    const filter = {};
    if (q) filter.q = q;
    if (status) filter.status = status;

    const data = await gqlRequest(
        SHIPMENTS_QUERY,
        {
            filter: Object.keys(filter).length ? filter : null,
            pagination: { limit, offset },
            sort: { sortBy: "deliveryDate", order: "desc" }
        },
        token
    );

    return data.shipments; // {nodes,totalCount,limit,offset}
}

export async function fetchShipmentById({ token, id }) {
    const data = await gqlRequest(SHIPMENT_QUERY, { id }, token);
    return data.shipment;
}
