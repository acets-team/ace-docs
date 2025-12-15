/** 
 * - Common vars file, that WILL be injected into the `fe` AND `be` build, anything imported into this file will too!
 * - 🚨 Do not put secret information into this file, use the `.env` file for that please
 */


import { Enums } from '@ace/enums'


export const themes = new Enums(['light', 'dark'])
