import PyPDF2


def edit_pdf_title(input_pdf, output_pdf, new_title):
    with open(input_pdf, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_writer = PyPDF2.PdfWriter()

        # Copy all pages from the input PDF to the output PDF
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)

        # Add or modify the document information dictionary with the new title
        pdf_writer.add_metadata({
            '/Title': new_title
        })

        # Write the modified PDF to the output file
        with open(output_pdf, 'wb') as output_file:
            pdf_writer.write(output_file)


if __name__ == "__main__":

    # # Path to your input PDF file
    # input_pdf = Path('dev/files/publications/2023_AIRP_Abstract_Rinaldi.pdf')
    # # Path for the output PDF file
    # output_pdf = Path('dev/files/publications/2023_AIRP_Abstract_Rinaldi__.pdf')
    # # New title of the PDF file
    # new_title = ''
    #
    # edit_pdf_title(input_pdf, output_pdf, new_title)

    input_files = [
        'dev/files/publications/2023_AIRP_Abstract_Rinaldi.pdf',
        'dev/files/publications/2023_AIRP_Abstract_Tikkanen.pdf',
        'dev/files/publications/2023_AIRP_Abstract_Toma.pdf',
        'dev/files/publications/2023_DRO_Poster.pdf',
        'dev/files/publications/2023_DRO_Presentation.pdf',
        'dev/files/publications/2023_ERPW_Abstract.pdf',
        'dev/files/publications/2023_ICDA4_Abstract.pdf',
        'dev/files/publications/2023_LNE_Presentation.pdf',
        'dev/files/publications/2024_IRPA_Abstract.pdf',
    ]
    output_files = [
        'dev/files/publications/2023_AIRP_Abstract_Rinaldi__.pdf',
        'dev/files/publications/2023_AIRP_Abstract_Tikkanen__.pdf',
        'dev/files/publications/2023_AIRP_Abstract_Toma__.pdf',
        'dev/files/publications/2023_DRO_Poster__.pdf',
        'dev/files/publications/2023_DRO_Presentation__.pdf',
        'dev/files/publications/2023_ERPW_Abstract__.pdf',
        'dev/files/publications/2023_ICDA4_Abstract__.pdf',
        'dev/files/publications/2023_LNE_Presentation__.pdf',
        'dev/files/publications/2024_IRPA_Abstract__.pdf',
    ]
    titles = [
        '2023_AIRP_Abstract_Rinaldi.pdf',
        '2023_AIRP_Abstract_Tikkanen.pdf',
        '2023_AIRP_Abstract_Toma.pdf',
        '2023_DRO_Poster.pdf',
        '2023_DRO_Presentation.pdf',
        '2023_ERPW_Abstract.pdf',
        '2023_ICDA4_Abstract.pdf',
        '2023_LNE_Presentation.pdf',
        '2024_IRPA_Abstract.pdf',
    ]
    for input_pdf, output_pdf, new_title in zip(input_files, output_files, titles):
        edit_pdf_title(input_pdf, output_pdf, new_title)
