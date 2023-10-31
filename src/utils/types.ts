export interface DashboardGridCellConfig {
    cellId: string,
    layout: {
        i: string, x: number, y: number, w: number, h: number, minW?: number, maxW?: number
    }
}