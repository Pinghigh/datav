export interface LogSeries  {
    labels: {[key: string]: string};
    values: [string,string][]
}



export interface LogThreshold {
    type: "label" | "content"
    key?: string
    value: string 
    color: string
}