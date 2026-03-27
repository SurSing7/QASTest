import { expect, type Locator, type Page } from "@playwright/test";
import * as XLSX from 'xlsx'; 
import path from 'path';
import { fileURLToPath } from 'url'

export interface userType {
    id: string;
    user: string;
    Pass: string | number;
}

export class PaymentsPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page; }

    async excelData<T>() {
    const dir = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.resolve(dir, '../testdata/dataxl.xlsx');
    
    const readFile = XLSX.readFile || (XLSX as any).default?.readFile;
    const workbook = readFile(filePath);
    const sheet = workbook.Sheets['Uqa'];
    return XLSX.utils.sheet_to_json(sheet) as T[];
}

    async populateField(data1:string|number , val2:string|number){
        console.log('#=',data1);
        console.warn('@',val2);
    }
}