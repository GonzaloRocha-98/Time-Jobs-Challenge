export interface City{
    readonly _id: string
    readonly name: string;
    readonly country: string;
    readonly temperature: number;
    readonly temperatureMin: number;
    readonly temperatureMax: number;
    readonly updated: Date;
}