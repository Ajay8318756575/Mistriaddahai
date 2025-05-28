
const { useState, useEffect } = React;
const { I18nextProvider, useTranslation, initReactI18next } = window.ReactI18next;

// i18next configuration
i18next.use(initReactI18next).init({
  resources: {
    en: { translation: {
      "title": "MistriAdda", "searchCity": "Search city", "selectMistriType": "Select mistri type",
      "search": "Search", "popularCategories": "Popular Categories", "electrician": "Electrician",
      "plumber": "Plumber", "mechanic": "Mechanic", "painter": "Painter", "becomeMistri": "Become a Mistri",
      "createProfile": "Create Mistri Profile", "fullName": "Full Name", "typeOfWork": "Type of Work",
      "location": "Location", "mobileNumber": "Mobile Number", "experienceYears": "Experience (Years)",
      "createProfileBtn": "Create Profile", "sortBy": "Sort By", "years": "years", "call": "Call",
      "whatsapp": "WhatsApp", "language": "Language", "english": "English", "hindi": "Hindi",
      "fillAllFields": "Please fill all fields!"
    } },
    hi: { translation: {
      "title": "मिस्त्रीआड्डा", "searchCity": "शहर चुनें", "selectMistriType": "मिस्त्री का प्रकार चुनें",
      "search": "खोजें", "popularCategories": "लोकप्रिय श्रेणियाँ", "electrician": "इलेक्ट्रीशियन",
      "plumber": "प्लंबर", "mechanic": "मैकेनिक", "painter": "पेंटर", "becomeMistri": "मिस्त्री बनें",
      "createProfile": "मिस्त्री प्रोफाइल बनाएं", "fullName": "पूरा नाम", "typeOfWork": "मिस्त्री का प्रकार",
      "location": "स्थान", "mobileNumber": "मोबाइल नंबर", "experienceYears": "अनुभव (वर्ष)",
      "createProfileBtn": "प्रोफाइल बनाएं", "sortBy": "सॉर्ट करें", "years": "वर्ष", "call": "कॉल करें",
      "whatsapp": "व्हाट्सएप", "language": "भाषा", "english": "इंग्लिश", "hindi": "हिंदी",
      "fillAllFields": "कृपया सभी फ़ील्ड भरें!"
    } }
  },
  lng: "hi",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

const loadProfessionals = () => {
  const data = localStorage.getItem("professionals");
  return data ? JSON.parse(data) : [
    { name: "राजेश कुमार", type: "पेंटर", location: "जयपुर", experience: 5, mobile: "8123456789" },
    { name: "सुनीता वर्मा", type: "पेंटर", location: "जयपुर", experience: 3, mobile: "9123456789" },
  ];
};

const saveProfessionals = (data) => {
  localStorage.setItem("professionals", JSON.stringify(data));
};

const App = () => {
  const [page, setPage] = useState("home");
  const [professionals, setProfessionals] = useState(loadProfessionals());
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    saveProfessionals(professionals);
  }, [professionals]);

  const handleSearch = () => setPage("results");
  const handleCreateProfile = (newProfile) => {
    setProfessionals([...professionals, newProfile]);
    setPage("home");
  };
  const handleViewProfile = (professional) => {
    setSelectedProfessional(professional);
    setPage("profile");
  };
  const handleBack = () => {
    setPage(selectedProfessional ? "results" : "home");
    if (page === "results") setSelectedProfessional(null);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <select onChange={(e) => changeLanguage(e.target.value)} className="p-2 rounded">
          <option value="hi">{i18n.t("hindi")}</option>
          <option value="en">{i18n.t("english")}</option>
        </select>
      </div>

      {page === "home" && (
        <HomePage
          onSearch={handleSearch}
          onCreateProfile={() => setPage("create")}
          setSearchCity={setSearchCity}
          setSearchType={setSearchType}
        />
      )}
      {page === "create" && (
        <CreateProfilePage onBack={handleBack} onSubmit={handleCreateProfile} />
      )}
      {page === "results" && (
        <ResultsPage
          onBack={handleBack}
          onViewProfile={handleViewProfile}
          professionals={professionals}
          searchCity={searchCity}
          searchType={searchType}
        />
      )}
      {page === "profile" && selectedProfessional && (
        <ProfilePage professional={selectedProfessional} onBack={handleBack} />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<I18nextProvider i18n={i18next}><App /></I18nextProvider>);
