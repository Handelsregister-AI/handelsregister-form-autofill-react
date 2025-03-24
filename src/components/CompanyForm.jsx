import React, { useState, useEffect, useCallback } from 'react';
import { searchCompany } from '../services/handelsregisterApi';
import './CompanyForm.css';

const CompanyForm = ({ companyData, onFetchCompanyData, onTypingStart, onSearchStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    legal_form: '',
    registration_court: '',
    registration_type: '',
    registration_number: '',
    street: '',
    house_number: '',
    postal_code: '',
    city: '',
    county: '',
    state: '',
    country: '',
    website: '',
    purpose: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [showFullForm, setShowFullForm] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  // Update form when companyData changes
  useEffect(() => {
    if (companyData) {
      setFormData({
        name: companyData.name || '',
        legal_form: companyData.legal_form || '',
        registration_court: companyData.registration?.court || '',
        registration_type: companyData.registration?.register_type || '',
        registration_number: companyData.registration?.register_number || '',
        street: companyData.address?.street || '',
        house_number: companyData.address?.house_number || '',
        postal_code: companyData.address?.postal_code || '',
        city: companyData.address?.city || '',
        county: companyData.address?.county || '',
        state: companyData.address?.state || '',
        country: companyData.address?.country || '',
        website: companyData.contact_data?.website || '',
        purpose: companyData.purpose || ''
      });

      setDataReceived(true);
      setShowLoadingScreen(false);

      // Längere Verzögerung für die Anzeige des vollständigen Formulars
      setTimeout(() => {
        setShowFullForm(true);
      }, 600); // Verzögerung auf 600ms erhöht
    }
  }, [companyData]);

  // Debounced API search function
  const debouncedSearch = useCallback((companyName) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (companyName && companyName.trim().length > 2) { // Nur suchen, wenn mindestens 3 Zeichen eingegeben wurden
      setIsLoading(true);

      // Benachrichtigung über Suchstart
      if (onSearchStart) {
        onSearchStart(companyName);
      }

      // Nach kurzer Verzögerung den Ladebildschirm anzeigen
      setTimeout(() => {
        if (isLoading) {
          setShowLoadingScreen(true);
        }
      }, 300);

      // Formular zurücksetzen, wenn eine neue Suche beginnt
      if (showFullForm) {
        setShowFullForm(false);
      }

      const timeoutId = setTimeout(async () => {
        try {
          const data = await searchCompany(companyName);

          // Wenn die Komponente eine Callback-Funktion erhält, rufe diese mit den Daten auf
          if (onFetchCompanyData) {
            onFetchCompanyData(data);
          } else {
            // Andernfalls aktualisiere direkt das Formular
            if (data) {
              setFormData({
                name: data.name || formData.name,
                legal_form: data.legal_form || '',
                registration_court: data.registration?.court || '',
                registration_type: data.registration?.register_type || '',
                registration_number: data.registration?.register_number || '',
                street: data.address?.street || '',
                house_number: data.address?.house_number || '',
                postal_code: data.address?.postal_code || '',
                city: data.address?.city || '',
                county: data.address?.county || '',
                state: data.address?.state || '',
                country: data.address?.country || '',
                website: data.contact_data?.website || '',
                purpose: data.purpose || ''
              });

              setDataReceived(true);

              // Kurze Verzögerung für bessere UX
              setTimeout(() => {
                setShowFullForm(true);
              }, 300);
            }
          }
        } catch (error) {
          console.error('Fehler bei der Unternehmenssuche:', error);
          setShowLoadingScreen(false);
        } finally {
          setIsLoading(false);
        }
      }, 500); // 500ms Debounce-Zeit

      setDebounceTimeout(timeoutId);
    }
  }, [debounceTimeout, onFetchCompanyData, formData.name, showFullForm, isLoading, onSearchStart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Wenn der Firmenname geändert wird, starte die Suche
    if (name === 'name') {
      // Benachrichtigung über Eingabestart
      if (value.length === 1 && onTypingStart) {
        onTypingStart();
      }
      debouncedSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="company-form-container">
      <form onSubmit={handleSubmit} className="company-form">
        <div className={`name-input-section form-section ${isLoading ? 'loading' : ''}`}>
          <div className="form-group">
            <label htmlFor="name">Firmenname</label>
            <div className="input-with-indicator">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Gib den Firmennamen ein und erlebe die Magie!"
                className={`${dataReceived ? 'data-received' : ''} ${isLoading ? 'loading-pulse' : ''}`}
              />
              {isLoading && <span className="loading-indicator">Suche...</span>}
            </div>
            <p className='powered-by'>Powered by <a href="https://handelsregister.ai" target='_blank'>Handelsregister.ai</a></p>
          </div>
        </div>

        {/* Loading Overlay mit Animation */}
        {showLoadingScreen && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Daten werden geladen...</p>
          </div>
        )}

        <div className={`full-form ${showFullForm ? 'show' : 'hide'}`}>
          <div className="form-column">
            <div className="form-column">
              <div className="form-section fade-in" style={{ animationDelay: '0.6s' }}>
                <h3>Adresse</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="street">Straße</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group small-input">
                    <label htmlFor="house_number">Hausnr.</label>
                    <input
                      type="text"
                      id="house_number"
                      name="house_number"
                      value={formData.house_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group small-input">
                    <label htmlFor="postal_code">PLZ</label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">Stadt</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="county">Landkreis</label>
                    <input
                      type="text"
                      id="county"
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">Bundesland</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Land</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section fade-in" style={{ animationDelay: '0.4s' }}>
                <h3>Registerinformationen</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="registration_court">Amtsgericht</label>
                    <input
                      type="text"
                      id="registration_court"
                      name="registration_court"
                      value={formData.registration_court}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="registration_type">Registerart</label>
                    <input
                      type="text"
                      id="registration_type"
                      name="registration_type"
                      value={formData.registration_type}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="registration_number">Registernummer</label>
                  <input
                    type="text"
                    id="registration_number"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="legal_form">Rechtsform</label>
                  <input
                    type="text"
                    id="legal_form"
                    name="legal_form"
                    value={formData.legal_form}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="purpose">Unternehmenszweck</label>
                  <textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-section fade-in" style={{ animationDelay: '0.8s' }}>
                <h3>Kontaktdaten</h3>
                <div className="form-group">
                  <label htmlFor="website">Webseite</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;