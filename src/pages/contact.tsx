import {
  AtSymbolIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Main from "@/components/layout/MainLayout";

export default function Contact() {
  return (
    <Main>
      <div className="my-auto" data-aos="fade-up">
        <p className="text-3xl">Dariusz Mazurek</p>
        <div className="text-xl flex flex-col gap-6 mt-6">
          <p className="flex gap-3 items-center">
            <PhoneIcon className="w-8 h-8" />
            +48 502-071-592
          </p>
          <p className="flex gap-3 items-center">
            <AtSymbolIcon className="w-8 h-8" />
            trip.poczta(małpka)onet.pl
          </p>
          <p className="flex gap-3 items-center">
            <EnvelopeIcon className="w-8 h-8" />
            skrytka pocztowa nr 664 00-001 Warszawa 1
          </p>
        </div>
      </div>
    </Main>
  );
}
