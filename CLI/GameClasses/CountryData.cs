using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("country_data")]
    public class CountryData
    {
        [SiiAttribute("country_id")]
        public int CountryId { get; set; }

        [SiiAttribute("country_code")]
        public string CountryCode { get; set; }

        [SiiAttribute("iso_country_code")]
        public string IsoCountryCode { get; set; }

        [SiiAttribute("name_localized")]
        public string NameLocalized { get; set; }
    }
}