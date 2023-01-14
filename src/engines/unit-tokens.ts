import ParseException from "../exceptions/parse.exception";

class UnitTokensEngine {
    private openedSiiNunit: boolean;
    private openedSiiNunitBraces: boolean;
    private openedClassBraces: boolean;

    isUnitToken(token: string) {
        return token === "SiiNunit" || token === "{" || token === "}";
    }

    canCreateClass() {
        return this.openedSiiNunit && this.openedSiiNunitBraces && !this.openedClassBraces;
    }

    canAssignNamespace() {
        return this.openedSiiNunit && this.openedSiiNunitBraces && !this.openedClassBraces;
    }

    canAssignAttribute() {
        return this.openedSiiNunit && this.openedSiiNunitBraces && this.openedClassBraces;
    }

    unitTokenUsage(value: string) {
        switch (value) {
            case "SiiNunit":
                this.siiNunitUsage();
                break;
            case "{":
                this.openBracesUsage();
                break;
            case "}":
                this.closeBracesUsage();
                break;
            default:
                throw new ParseException(`Invalid unit token usage, ${value} is not unit token!`);
        }
    }

    private siiNunitUsage() {
        if (this.openedSiiNunit) {
            throw new ParseException(`SiiNunit is already opened! Invalid file contents.`);
        }

        this.openedSiiNunit = true;
    }

    private openBracesUsage() {
        /*
         * Prevent usage of open braces before SiiNunit line
         * for ex.
         *
         *  {
         *  accessory_transmission_data : grs905.scania.r_2016.transmission
         *
         * or
         *
         *  {
         *  SiiNunit
         */
        if (!this.openedSiiNunit) {
            throw new ParseException("Can't use open braces when SiiNunit is not opened! Invalid file contents")
        }

        if (!this.openedSiiNunitBraces) this.openedSiiNunitBraces = true;
        else if (!this.openedClassBraces) this.openedClassBraces = true;
        else {
            throw new ParseException("Can't use open braces after class braces have been opened! Invalid file contents.")
        }
    }

    private closeBracesUsage() {
        if (!this.openedSiiNunit) {
            throw new ParseException("Can't use close braces when SiiNunit is not opened! Invalid file contents");
        }

        if (this.openedClassBraces) this.openedClassBraces = false;
        else if (this.openedSiiNunitBraces) this.openedSiiNunitBraces = false;
        else {
            throw new ParseException("Can't use close braces before opening anything with open braces! Invalid file contents.");
        }
    }
}

export default UnitTokensEngine;