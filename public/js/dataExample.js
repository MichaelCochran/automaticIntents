

//This is a small example; data can be loaded from a JSON file or queried via a database
const medicalData = [
    {
        "department": "Oncology",
        "phone": "(626) 555-1122",
        "doctors": [
            {"name": "Dr. Emily Carter", "specialty": "Oncologist"},
            {"name": "Dr. Daniel Kim", "specialty": "Hematologist"},
            {"name": "Dr. Freda Oncol", "specialty": "Oncologist"},
            {"name": "Dr. Valentina Adami", "specialty": "Oncologist"}

        ],
        "appointments": [
            {"date": "2024-07-18", "doctor": "Dr. Emily Carter", "time": "11:00 AM"},
            {"date": "2024-08-05", "doctor": "Dr. Jay Gupta", "time": "3:15 PM"}
        ]
    },
    {
        "department": "Internal Medicine",
        "phone": "(626) 555-3344",
        "doctors": [
            {"name": "Dr. Olivia Rodriguez", "specialty": "Internist"},
            {"name": "Dr. William Nguyen", "specialty": "Infectious Disease Specialist"},
            {"name": "Dr. Marlinda Thomas", "specialty": "Infectious Disease Specialist"}
        ],
        "appointments": [
            {"date": "2024-07-22", "doctor": "Dr. Olivia Rodriguez", "time": "9:45 AM"},
            {"date": "2024-08-12", "doctor": "Dr. William Nguyen", "time": "2:00 PM"}
        ]
    }
]


// Example Console commands:
// const oncologyDepartment = medicalData.find(dept => dept.department === "Oncology");
// console.log("Oncology Department Phone Number:", oncologyDepartment.phone);
// console.log("Doctor Data",getDocData("Rodriguez"));

function getMedicalInfo(query, type) {
    const queryLower = query.toLowerCase();

    if (type === 'doctor') {
        for (const department of medicalData) {
            const matchingDoctor = department.doctors.find(d =>
                d.name.toLowerCase().includes(queryLower)
            );

            if (matchingDoctor) {
                return {
                    doctor: matchingDoctor.name,
                    specialty: matchingDoctor.specialty,
                    department: department.department,
                    phone: department.phone
                };
            }
        }
    } else if (type === 'department') {
        const matchingDepartment = medicalData.find(dept =>
            dept.department.toLowerCase().includes(queryLower) ||
            dept.doctors.some(doc => doc.specialty.toLowerCase().includes(queryLower))
        );

        if (matchingDepartment) {
            return {
                department: matchingDepartment.department,
                phone: matchingDepartment.phone,
                doctors: matchingDepartment.doctors.map(doc => doc.name).join(', ')
            };
        }
    }

    return null;
}