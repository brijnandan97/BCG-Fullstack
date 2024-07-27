import { ConnectionChart } from "./connection-chart/connection-chart"
import { ConnectionTable } from "./connection-table/connectiontable"

export const DashboardPage = () => {
    return <>
    <ConnectionChart/>
    <ConnectionTable/>
    </>
}