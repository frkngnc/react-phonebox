# Form Integration

The `PhoneBox` component works seamlessly with form libraries like `react-hook-form` and `formik`.

---

## ✅ React Hook Form

### Installation

```bash
npm install react-hook-form
```

### Example

```tsx
'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PhoneBox } from 'react-phonebox';
import 'react-phonebox/style.css';

export default function RHFExample() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      phone: '',
      phoneE164: '',
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneBox
            value={field.value}
            onChange={field.onChange}
            onRawChange={(raw) => setValue('phoneE164', raw)}
            initialCountry="US"
            locale="en"
            mobileOnly
          />
        )}
      />
      <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
    </form>
  );
}
```

---

## ✅ Formik

### Installation

```bash
npm install formik
```

### Example

```tsx
'use client';
import React from 'react';
import { useFormik } from 'formik';
import { PhoneBox } from 'react-phonebox';
import 'react-phonebox/style.css';

export default function FormikExample() {
  const formik = useFormik({
    initialValues: {
      phone: '',
      phoneE164: '',
    },
    onSubmit: (values) => {
      console.log('Formik form data:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <PhoneBox
        value={formik.values.phone}
        onChange={(val) => formik.setFieldValue('phone', val)}
        onRawChange={(raw) => formik.setFieldValue('phoneE164', raw)}
        initialCountry="US"
        locale="en"
        mobileOnly
      />
      <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
    </form>
  );
}
```

`phone` contains the formatted display value. `phoneE164` contains the
international E.164 value that is usually preferable for API requests and
database storage.
