# Main class that does all the classification

from keywords import (  # type: ignore
    keyword_to_function,
    seniority_keywords,
    department_keywords
)
from job_classifier import JobClassifier
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

classifier = JobClassifier(
        keyword_to_function=keyword_to_function,
        department_keywords=department_keywords,
        seniority_keywords=seniority_keywords
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class JobPayload(BaseModel):
    job_title: str
    company_name: str


@app.post("/classify")
def classify_jobs(payload: JobPayload):
    job_title = payload.job_title
    company_name = payload.company_name

    result = classifier.classify(job_title)

    return result
