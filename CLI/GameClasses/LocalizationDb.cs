using System;
using System.Collections.Generic;
using SiiParser;
using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("localization_db")]
    public class LocalizationDb : GameClass
    {
        [SiiAttribute("key[]")]
        public List<Object> Keys { get; set; }
        
        [SiiAttribute("val[]")]
        public List<Object> Values { get; set; }
    }
}