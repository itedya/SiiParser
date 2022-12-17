using System;
using SiiParser.Exceptions;

namespace SiiParser.Engines
{
    public class UnitTokensEngine
    {
        private bool OpenedSiiNunit { get; set; }
        private bool OpenedSiiNunitBraces { get; set; }
        private bool OpenedClassBraces { get; set; }

        public bool CanCreateClass()
        {
            return OpenedSiiNunit && OpenedSiiNunitBraces && !OpenedClassBraces;
        }

        public bool CanAssignNamespace()
        {
            return OpenedSiiNunit && OpenedSiiNunitBraces && !OpenedClassBraces;
        }

        public bool CanAssignAttribute()
        {
            return OpenedSiiNunit && OpenedSiiNunitBraces && OpenedClassBraces;
        }

        public void UnitTokenUsage(string value)
        {
            switch (value)
            {
                case "SiiNunit":
                    SiiNunitUsage();
                    break;
                case "{":
                    OpenBracesUsage();
                    break;
                case "}":
                    CloseBracesUsage();
                    break;
                default:
                    throw new ParseException(String.Format(@"Invalid unit token usage, ""{0}"" is not unit token!",
                        value));
            }
        }

        private void SiiNunitUsage()
        {
            if (OpenedSiiNunit)
            {
                throw new ParseException("SiiNunit is already opened! Invalid file contents.");
            }

            OpenedSiiNunit = true;
        }

        private void OpenBracesUsage()
        {
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
            if (!OpenedSiiNunit)
            {
                throw new ParseException("Can't use open braces when SiiNunit is not opened! Invalid file contents");
            }

            if (!OpenedSiiNunitBraces) OpenedSiiNunitBraces = true;
            else if (!OpenedClassBraces) OpenedClassBraces = true;
            else
            {
                throw new ParseException(
                    "Can't use open braces after class braces have been opened! Invalid file contents.");
            }
        }

        private void CloseBracesUsage()
        {
            if (!OpenedSiiNunit)
            {
                throw new ParseException("Can't use close braces when SiiNunit is not opened! Invalid file contents");
            }

            if (OpenedClassBraces) OpenedClassBraces = false;
            else if (OpenedSiiNunitBraces) OpenedSiiNunitBraces = false;
            else
            {
                throw new ParseException(
                    "Can't use close braces before opening anything with open braces! Invalid file contents.");
            }
        }
    }
}