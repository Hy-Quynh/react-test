export type OrderItem = {
  createdAt: string,
  customer_name: string,
  customer_email: string,
  food_ids: string[],
  order_id: string
}
export type OrderListType = OrderItem[]

export type OrderUpdateType = {
  customer_name?: string,
  customer_email?: string,
  food_ids?: string[],
  order_id?: string
}

export type OrderCreateType = {
  createdAt: string,
  customer_name: string,
  customer_email: string,
  food_ids: string[],
}